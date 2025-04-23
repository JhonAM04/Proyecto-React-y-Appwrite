import { Box } from "@chakra-ui/react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ReceiptPDF from "./ReceiptPDF"
import { UseCartStore } from "../shared/store/UseCartStore"

const CompraExitosa = () => {
    const {products} = UseCartStore()
  return (
    <Box>
        <PDFDownloadLink document={<ReceiptPDF items={products}/>} fileName="Boleta de compra">
            Descargar
        </PDFDownloadLink>
    </Box>
  )
}

export default CompraExitosa