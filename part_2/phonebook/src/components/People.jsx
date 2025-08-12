const People = ({filtered, handleDelete}) => {
    return (
        <>
            {filtered.map(person => <p key = {person.id}>{person.name} {person.number} <button onClick = {() => handleDelete(person)}>delete</button></p> )}
        </>
)}

export default People