import moongose from 'mongoose';

async function connect(){
    try{
        await moongose.connect('mongodb+srv://protesisapp:MqF5cCTNOEqEcBet@cluster0-kjcqg.mongodb.net/App?retryWrites=true&w=majority', {
            useUnifiedTopology : true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex : true,
        });
        console.log('>>> Databse is connected.');
    }catch{
        console.log('Connected error to DataBase');
    }
};

export default connect;