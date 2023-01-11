import { fillCity } from './css-city/city'
import { transformBasedOnScroll } from './css-city/scroll'

const city = document.getElementById('city')!
const header = document.querySelector('header')! as HTMLElement

fillCity(city)

city.onclick = () => {
  city.innerHTML = ''
  fillCity(city)
}

transformBasedOnScroll(header)
window.addEventListener('scroll', () => transformBasedOnScroll(header))
