function convertDocToObj(doc) {
    doc._id = doc._id.toString();
    return doc;
}
export default convertDocToObj