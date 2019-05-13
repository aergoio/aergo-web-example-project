state.var {
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

abi.register(increment)