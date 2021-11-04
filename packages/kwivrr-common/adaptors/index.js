import playgroundAdaptor from './playgroundAdaptor';
import vibeCoreAdaptor from './vibeCoreAdaptor';

const adaptors = {
    ...playgroundAdaptor,
    ...vibeCoreAdaptor,
};

const extra = { ...adaptors };

export default extra;
