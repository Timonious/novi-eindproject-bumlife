import {adress} from "./adressSplit"

export const mapsLinkMaker = (data, lon, lat) => {

    const name = adress(data)[0].split(' ').join('+');
    const street = adress(data)[0].split(' ').join('+');
    const postal = adress(data)[0].split(' ').join('+');

    return `https://www.google.nl/maps/dir/${lon},${lat}/${name},+${street}+${postal}/`
}
