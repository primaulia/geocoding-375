require("@rails/ujs").start()
require("@rails/activestorage").start()
require("channels")

import "bootstrap";

import { initMapbox } from '../plugins/init_mapbox'
import { initAutocomplete } from '../plugins/init_autocomplete'

initMapbox();
initAutocomplete();