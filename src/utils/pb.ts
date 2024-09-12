import PocketBase from 'pocketbase';
import { API } from './constants';

const pb = new PocketBase(API);

// pb.autoCancellation(false);

export default pb