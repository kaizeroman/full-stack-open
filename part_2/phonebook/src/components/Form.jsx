const Input = ({value, onChange, keyName}) =>{
    return (
        <div>
            {keyName}: <input value={value} onChange={onChange}/>
        </div>
    )
}

const Button = () => {
    return (
        <div>
          <button type="submit">add</button>
        </div>
    )
}

const Form = ({onSubmit, value1, change1, value2, change2}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input value = {value1} onChange= {change1} keyName="name"/>
            <Input value = {value2} onChange= {change2} keyName="number"/>
            <Button />
        </form>
    )
}

export default Form