import plugin from 'tailwindcss/plugin';
import btnComponent from './lib/components/btn';
import baseComponent from './lib/base/index';

const zmUIPlugin = plugin(({ addComponents }) => {
  addComponents(baseComponent);
  addComponents(btnComponent);
});
export default zmUIPlugin;
