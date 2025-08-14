const Notification = ({ notification }) => {
  if(!notification) return null

  const baseStyle = {
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'}

    const style = notification.type === 'success' ? {...baseStyle, color: 'green'} : {...baseStyle, color: 'red'}

  return (
    <div style = {style}>
      {notification.text}
    </div>
  )
}

export default Notification