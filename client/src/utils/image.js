export const getImageURL = (name) => {
    return new URL(`../assets/${name}.jpg`, import.meta.url).href
}