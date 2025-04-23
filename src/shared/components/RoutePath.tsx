import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { Paths } from "../../router/Routes"

const RoutePath = ({productName}:{
    productName: string
}) => {
  return (
    <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink to={Paths.Home} as={Link}>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink >{productName}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
  )
}

export default RoutePath