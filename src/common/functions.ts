export function trimDtoAttributes(dto: any) {
    for (const atr in dto) {
        if (typeof dto[atr] === "string") {
            dto[atr] = dto[atr].trim();
        }
    }
}