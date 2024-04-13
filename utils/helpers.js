module.exports = {
  format_date: (date) => {
      // Format date as MM/DD/YYYY
      const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
  },
  format_amount: (amount) => {
      // Format large numbers with commas
      return parseFloat(amount).toLocaleString();
  },
  get_emoji: () => {
      const randomNum = Math.random();
      // Return a random emoji
      if (randomNum > 0.7) {
          return `<span for="img" aria-label="lightbulb">💡</span>`;
      } else if (randomNum > 0.4) {
          return `<span for="img" aria-label="laptop">💻</span>`;
      } else {
          return `<span for="img" aria-label="gear">⚙️</span>`;
      }
  },
};