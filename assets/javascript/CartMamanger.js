class Cart {
    constructor() {
        this.cartCount = 0;
    }
    setamount(amount) {
        this.cartCount = amount;
    }
    getamount() {
        return this.cartCount;
    }

    async initialize() {
        try {
            const response = await this.setup();
            this.cartCount = parseInt(response) || 0;
            this.updateCartCountUI();
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    }

    async addToCart(id) {
        this.cartCount++;
        this.updateCartCountUI();
        await this.updateServerCartCount(id);
    }

    async setup() {
        try {
            const response = await $.ajax({
                type: "POST",
                url: "http://webshop10.nhely.hu/api/cart.php",
                data: {
                    getAmount: "asd"
                },
            });

            return response;
        } catch (error) {
            console.error('Error during setup:', error);
        }
    }

    updateCartCountUI() {
        document.getElementById("cart-count").innerHTML = this.cartCount;
    }

    async updateServerCartCount(id) {
        try {
            const data = await $.ajax({
                type: "POST",
                url: "http://webshop10.nhely.hu/api/cart.php",
                data: {
                    setAmount: this.cartCount, id: id
                },
            });

            if (data === "true") {
                showAlert("Sikeresen hozzáadtad a kosaradhoz!");
            }
        } catch (error) {
            console.error('Error updating server cart count:', error);
        }
    }
    reset() {
        $.ajax({
            type: "POST",
            url: "http://webshop10.nhely.hu/api/cart.php",
            data: {
                Reset: "asd"
            },
            success: function (data) {
                this.cartCount = 0;
                window.location.reload();
            },
        });
    }
    removeone() {

    }
}

const cart = new Cart();
cart.initialize();


