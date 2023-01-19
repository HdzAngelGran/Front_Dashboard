const statusPet = (status, data) => {
    let next = false;

    switch (status) {
        case 200:
            next = true;
            break;
        case 201:
            next = true;
            break;
        case 206:
            next = true;
            break;
        case 406:
            next = false;
            break;
        default:
            next = false;
            break;
    }

    return next;
}