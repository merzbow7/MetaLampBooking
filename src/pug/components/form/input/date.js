import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const datepickers = document.querySelectorAll('[data-form-type="datepicker"]');

datepickers.forEach((picker) => new AirDatepicker(picker));
