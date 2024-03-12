// myMixin.js
export const myMixin = {
  methods: {
    getAllFoodIds() {
      const foodIds = [];
      this.store.cart.items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          foodIds.push(item.food_id);
        }
      });
      return foodIds;
    },
  },

  watch: {
    "store.cart.items": {
      handler() {
        let subtotal = 0; // Inizializza il subtotal come variabile locale
        this.store.cart.items.forEach((element) => {
          const price = parseFloat(element.price);
          if (!isNaN(price)) {
            subtotal += price * element.quantity; // Aggiungi il prezzo senza arrotondare
          }
        });
        this.store.cart.subtotal = subtotal.toFixed(2); // Assegna il subtotal arrotondato a due decimali
      },
      deep: true, // Assicurati di osservare le modifiche in profondità
    },
  },
};
