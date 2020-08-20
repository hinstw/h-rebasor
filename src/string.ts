export function replaceText(text: string, oldSubString: string, newSubText: string): string {
    return text.split(oldSubString).join(newSubText);
}