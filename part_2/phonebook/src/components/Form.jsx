const Input = ({value, onChange, keyName}) =>{
    return (
        <div>
            {keyName}: <input required value={value} onChange={onChange}/>
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

const Form = ({onSubmit, person, change1, change2}) => {
    return (
        <form onSubmit={onSubmit}>
            <Input value = {person.name} onChange= {change1} keyName="name"/>
            <Input value = {person.number} onChange= {change2} keyName="number"/>
            <Button />
        </form>
    )
}

export default Form