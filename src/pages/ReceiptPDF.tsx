import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'
import { CartItem } from '../shared/store/UseCartStore'

const estilos = StyleSheet.create({
    pagina: {
        color: 'red'
    }
})

const ReceiptPDF = ({items}: {
    items: CartItem[]
}) => {
  return (
    <Document>
        <Page size='A4' style={estilos.pagina}>
            {
                items.map((p)=> (
                    <Text>{p.product.title}</Text>
                ))
            }
        </Page>

    </Document>
  )
}

export default ReceiptPDF