class Errors{

    constructor(){

        this.errors = {};

    };

    has(field){
        return this.errors.hasOwnProperty(field);
    }

    
    get(field){

        if(this.errors[field]) {
            return this.errors[field][0];
        }

    }

    any(){
        return Object.keys(this.errors).length > 0;
    }
    record(errors){
        this.errors = errors;
    }

    clear(field){
        if (field) {
            delete this.errors[field];

            return;
        }

        this.errors = {};
    }

}

class Form {

    constructor(data){

        this.dataOriginal = data;

        for (let field in data){
            this[field] = data[field];
        }

        this.errors = new Errors();

    }

    data(){

        let data = Object.assign({}, this); 

        delete data.dataOriginal;
        delete data.errors;

        return data;

    }
    reset(){
     for (let field in this.dataOriginal){
         this[field] = '';
     } 
    }

    submit(requestType, url){
        axios[requestType](url, this.data())
            .then(this.onSuccess.bind(this))
            .catch(this.onFailure.bind(this));
            

    }

    onSuccess(response){

        alert(response.data.message);

        this.errors.clear();
        this.reset;

    }

    onFailure(error){
        this.errors.record(error.response.data)

    }
}

new Vue({
    el: '#app',

    data: {
        form: new Form({

            title: '',
            description_long: '',
            description_short: '',
            time: '',
            loc_string: '',
            lat: '',
            long: '',
            interest_1: '',
            interest_2: '',


        }),

       
        errors: new Errors(),


    },

    methods: {

        onSubmit(){
            this.form.submit('post', '/events');
            
            
        },

    }
});