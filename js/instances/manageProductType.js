


var sc = new Vue({

	el: '#manageProductType',

	data: {
		
		pageCounter : 44,
		userData : {},
		isOpenAddProductTypeModal : false,
		productType : { 
			id : { value : '', error : ''},
			description : { value : '', error : ''},
		},
		productTypes : [],
		mMessage : "",
		mMessageType : "",
		isForAdding : true


		
	},

	mounted(){

		this.fetchProductType();
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		validateProductTypeDescription(){

			this.productType.description.error = validateName(this.productType.description.value,true);

		},

		openUpdateProductTypeModal(index){

			this.isOpenAddProductTypeModal = true;
			this.isForAdding = false;

			this.productType.id.value = this.productTypes[index].id;
			this.productType.description.value = this.productTypes[index].description;

			
		},

		openAddProductTypeModal(){

			this.isOpenAddProductTypeModal = true;

		},

		closeAddProductTypeModal(){

			this.isOpenAddProductTypeModal = false;
			this.isForAdding = true;
			this.productType.id.value = ""
			this.productType.description.value = "";

			this.productType.id.error = "";
			this.productType.description.error = "";

		},

		saveProductType(){

			let self = this;

			this.validateProductTypeDescription();

			if(this.productType.description.error == ""){

				axios.post('../php/api/saveProductType.php',{
	            
	                product_type : this.productType
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully saved product type. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.closeAddProductTypeModal();

	            })
	            .catch(function (error) {
	                console.log(error);
	            });

	        }

		},

		updateProductType(){

			let self = this;

			this.validateProductTypeDescription();

			if(this.productType.description.error == ''){

				axios.post('../php/api/updateProductType.php',{
	            
	                product_type : this.productType
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully updated product type. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.closeAddProductTypeModal();

	            })
	            .catch(function (error) {
	                console.log(error);
	            });

	        }

		},

		archiveProductType(id){

			let self = this;

			axios.post('../php/api/archiveProductType.php',{
            
                product_type_id : id
                
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully deleted product type. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.savingModalMessage = "Error in saving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }

                self.closeAddProductTypeModal();

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchProductType(){

			let self = this;
			axios.post('../php/api/fetchProductType.php',{
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.productTypes = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		closeMMessage(){
			this.mMessage = "";
			this.fetchProductType();
		}

	}

});




