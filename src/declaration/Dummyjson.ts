type Reviews = {
    rating: number
    comment: string
    date: string
    reviewerName: string
}

type DummyProductDimensions = {
    width: number
    height: number
    depth: number
}

export type DummyProduct = {
    id: number
    title: string
    description: string
    category: string
    price: number
    rating: number
    tags: Array<string>
    brand: string
    dimensions: DummyProductDimensions
    reviews: Array<Reviews>
    images: Array<string>
    thumbnail: string
}

export type DummySession = {
    accessToken: string
    email: string
    firstName: string
    gender: string
    id: number
    image: string
    username: string
}

export type DummyCategory = {
    slug: string
    name: string
    url: string
}