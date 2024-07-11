export default function extractArrayFromString(inputString: string) {
    const regex = /\{[^{}]*\}/g;

    const matches = inputString.match(regex);

    if (matches) {
        const extractedArray = matches.map((match) => {
            try {
                return eval('(' + match + ')');
            } catch (error) {
                console.error('Error parsing object:', error);
                return null;
            }
        });

        return extractedArray.filter((obj) => obj !== null);
    } else {
        console.error('No objects found in the input string.');
        return null;
    }
}
