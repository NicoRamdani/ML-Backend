const { Firestore } = require('@google-cloud/firestore');

const fireStore = new Firestore();
const collection = fireStore.collection('predictions');

const savePredictionFirestore = async (data) => {
    await collection.doc(data.id).set(data)

};


const getPreditictionFromFirestore = async () => {
    const snapshot = await collection.get();
    const predictions = [];
    snapshot.forEach(doc => {
        predictions.push(doc.data())
    });
    return predictions;
}


module.exports = {
    savePredictionFirestore,
    getPreditictionFromFirestore
}