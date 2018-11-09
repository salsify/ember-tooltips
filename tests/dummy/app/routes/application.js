import Route from '@ember/routing/route';
import { capitalize } from '@ember/string';

export default Route.extend({

  actions: {

    linkTo(url) {
      window.open(url);
    },

    transitionTo(routeName) {
      const nameParts = routeName.split('-');
      const [one, two, three] = nameParts;
      const oneCapitalized = capitalize(one);

      this.transitionTo(routeName);
      this.controller.set('pageTitle', `${oneCapitalized}s ${two} ${three}s`);
    },
  },

});
