<template>
  <div class="about">
    <h1>Smart Contract Playground</h1>
    <p>
      Here is an example to get you started developing smart contracts and
      interacting with them in your app.
    </p>
    <p>Please work through this page, and afterwards make sure to check out the source code!</p>

    <h2>Write Contract</h2>
    <p>
      For this example, we use a very simple contract that has one state variable
      that can be initialized to a value and a method to increment that value.
      This is the complete contract code:
    </p>
    <pre v-highlightjs><code class="lua" data-lang="lua">{{contractSource}}</code></pre>

    <h2>Import Contract ABI</h2>
    <p>
      You can easily import the ABI exposed by a smart contract by importing
      the Lua source code like this.</p>
    <!-- eslint-disable-next-line -->
    <pre v-highlightjs><code class="javascript" data-lang="js">import ContractInc from '@contract/contract-inc.lua';
console.log(ContractInc.abi);</code></pre>
    <p>
      In case you wonder, this works using a Webpack loader: <code><a href="https://www.npmjs.com/package/@aergo/athena-webpack-loader">@aergo/athena-webpack-loader</a></code>.
      Let's look at the result:
    </p>
    <pre v-highlightjs><code data-lang="json">{{abi}}</code></pre>

    <h2>Prepare Account</h2>
    <p>
      To deploy contracts and execute them, you need an account with a sufficient balance.
      When using test mode with your own local Aergo node, you can simply generate a new address.
      It automatically gets assigned a balance for testing.
    </p>

    <!-- eslint-disable-next-line -->
    <pre v-highlightjs><code class="javascript" data-lang="js">const account = await this.$aergo.accountManager.createAccount()</code></pre>

    <p>Running this code just generated this new address for you:<br>
    <strong v-if="account">{{account.address}}</strong></p>
    <p>Let's check the balance using this code:</p>
    <!-- eslint-disable-next-line -->
    <pre v-highlightjs><code class="javascript" data-lang="js">const state = await this.$aergo.getClient().getState(account.address);
const balance = state.balance.toUnit('aergo');</code></pre>

    <p>
      The current balance of this account is:
      <strong v-if="accountState">{{accountState.balance.toUnit('aergo')}}</strong>
    </p>
    <p>Great, we can start using this account right away.</p>

    <h2>Deploy Contract</h2>
    <p>
      To deploy a contract, you need to send a transaction containing its code.
      At this time, you can also define parameters for the constructor function.
    </p>

    <!-- eslint-disable-next-line -->
    <pre v-highlightjs><code class="javascript" data-lang="js">const contract = Contract.fromCode(ContractInc.payload);
const tx = {
    from: this.account.address.toString(),
    to: null,
    amount: 0,
    payload: contract.asPayload([this.initialValue])
};
const txTracker = await this.$aergo.sendTransaction(this.account, tx);
const receipt = await txTracker.getReceipt();
console.log(receipt.contractaddress);</code></pre>

    <p><label>
      Initial value
      <input type="number" v-model="initialValue">
    </label></p>
    <button @click="deploy">Deploy Contract</button> {{deployStatusText}}

    <p v-if="contractAddress">
      The contract has been deployed at address <strong>{{contractAddress}}</strong>.
    </p>

    <section :class="{disabled: !contractAddress}">
      <h2>Instantiate Contract Object</h2>
      <p>Now let's load the contract:</p>

      <!-- eslint-disable-next-line -->
      <pre v-highlightjs="`const contract = Contract.fromAbi(ContractInc.abi).setAddress('${contractAddress}');`"><code class="javascript" data-lang="js"></code></pre>

      <h2>Execute, Query, and Events</h2>
      <p>
        We can now execute contract methods and query its state. Our contract also emits an
        event every time it is executed. Play around by clicking the two buttons below.
      </p>
      <div class="box">
        <button @click="execute">Execute 'increment'</button>
        {{executeStatusText}}
      </div>
      <div class="box">
        <button @click="query">Query 'Value'</button> {{queryStatusText}} {{lastValue}}
      </div>
      <div class="box">
        <strong>Events</strong>
        <ul>
          <li v-for="event in events" :key="event.txhash">
            <code>{{event.eventName}} ({{event.args}})</code> in
            transaction {{event.txhash}} at block {{event.blockno}}
          </li>
        </ul>
      </div>

      <h2>Next Steps</h2>
      <p>
        Congratulations! You sucesfully deployed a smart contract to Aergo
        and interacted with it.
      </p>
      <p>
        Now have a look at the source code. You can find it in src/views/Contract.vue.
        If you're new to Vue.js, also check out the suggested
        resources <router-link to="/vue">here</router-link>.
      </p>
      <p>
        And in case you want to use a different framework after all,
        Aergo works well in any environment.
      </p>
    </section>
  </div>
</template>

<script>
import ContractInc from '@contract/contract-inc.lua';
import { Contract } from '@herajs/client';

const contractSource = `state.var {
    Value = state.value()
}

function constructor(init_value)
    Value:set(init_value)
end

function increment()
    a = Value:get()
    Value:set(a + 1)
    contract.event("incremented", a, a + 1) 
end

abi.register(increment)`;

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  data() {
    return {
      contractSource,
      account: null,
      accountState: null,
      initialValue: 10,
      deployStatusText: '',
      executeStatusText: '',
      queryStatusText: '',
      contractAddress: null,
      lastValue: null,
      events: [],
    };
  },
  computed: {
    abi() {
      return JSON.stringify(ContractInc.abi, null, 2);
    },
  },
  created() {
    this.$aergo.accountManager.createAccount().then((account) => {
      this.account = account;
      this.$aergo.getClient().getState(this.account.address).then((state) => {
        this.accountState = Object.freeze(state);
      });
    });
  },
  methods: {
    async execute() {
      this.executeStatusText = 'Executing...';
      const contract = Contract.fromAbi(ContractInc.abi).setAddress(this.contractAddress);
      const tx = contract.increment().asTransaction({
        from: this.account.address,
      });
      const txTracker = await this.$aergo.sendTransaction(this.account, tx);
      await txTracker.getReceipt();
      this.executeStatusText = 'Done.';
    },
    async query() {
      this.queryStatusText = 'Querying...';
      const contract = Contract.fromAbi(ContractInc.abi).setAddress(this.contractAddress);
      this.lastValue = await this.$aergo.getClient().queryContractState(contract.queryState('_sv_Value'));
      this.queryStatusText = '';
    },
    async deploy() {
      this.deployStatusText = 'Deploying...';
      const contract = Contract.fromCode(ContractInc.payload);
      const tx = {
        from: this.account.address.toString(),
        to: null,
        amount: 0,
        payload: contract.asPayload([this.initialValue]),
      };
      let receipt;
      try {
        const txTracker = await this.$aergo.sendTransaction(this.account, tx);
        receipt = await txTracker.getReceipt();
      } catch (e) {
        this.deployStatusText = e.toString();
        console.log(e);
        return;
      }
      this.contractAddress = receipt.contractaddress;
      this.deployStatusText = '';

      this.streamEvents();
    },
    streamEvents() {
      const stream = this.$aergo.getClient().getEventStream({
        address: this.contractAddress,
      });
      stream.on('data', (event) => {
        this.events.unshift(event);
      });
    },
  },
};
</script>

<style type="sass" scoped>
pre {
  white-space: pre-wrap;
}
pre code {
  display: block;
  text-align: left;
  background-color: #f7f7f7;
  margin: 1.5em 0;
  padding: 1em;
}
pre code[data-lang] {
  position: relative;
  padding-right: 3em;
}
code[data-lang]:after {
  content: attr(data-lang);
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(0,0,0,0.1);
  padding: .5em;
  text-transform: uppercase;
  font-size: .9em;
  font-weight: bold;
}
button, input[type=text], input[type=number] {
  border: 1px solid #333;
  padding: .5em 1em;
  line-height: 3em;
  background-color: #fff;
  font: inherit;
  font-weight: normal;
  cursor: pointer;
}
button {
  font-weight: bold;
}
label {
  font-weight: bold;
  display: flex;
  flex-direction: column;
  align-items: center;
}
section.disabled {
  opacity: .4;
}
.box {
  text-align: left;
  border: 1px solid #aaa;
  padding: 1em;
}
.box + .box {
  border-top: 0;
}
</style>
