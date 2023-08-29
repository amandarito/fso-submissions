const Footer = () => {
  const footerStyle = {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: 16 // px
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2023
      </em>
    </div>
  )
}

export default Footer
