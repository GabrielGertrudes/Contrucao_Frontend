export default function Familia(props) {

    const { nomeFamilia } = props

    return (
        <>
            <h3>Família {nomeFamilia}</h3>
            {props.children}
        </>
    )
}