import { fillCity } from './css-city/city'
import { transformBasedOnScroll } from './css-city/scroll'

const city = document.getElementById('city')!

fillCity(city)

city.onclick = () => {
  Array.from(city.children).forEach((c) => c.remove())
  fillCity(city)
}

transformBasedOnScroll(city)
window.addEventListener('scroll', () => transformBasedOnScroll(city))
