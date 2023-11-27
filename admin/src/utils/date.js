/**
 * Proposed date utility class... to be extended!
 *
 * @return Date
 *
 */
class CustomDate {
    static #hour = 3600000;
    static #day = 86400000;
    static #minute = 60000;
    static addHour() {
        return new Date(new Date().getTime() + CustomDate.#hour).getTime();
    }
    static addHours(value) {
        return new Date(
            new Date().getTime() + CustomDate.#hour * value
        ).getTime();
    }

    static addDay() {
        return new Date(new Date().getTime() + CustomDate.#day).getTime();
    }

    static addDays(value) {
        return new Date(
            new Date().getTime() + CustomDate.#day * value
        ).getTime();
    }

    static addMinutes(value) {
        return new Date(
            new Date().getTime() + CustomDate.#minute * value
        ).getTime();
    }

    static addMinute() {
        return new Date(new Date().getTime() + CustomDate.#minute).getTime();
    }

    static now() {
        return new Date(new Date().getTime()).getTime();
    }
}

export default CustomDate;
