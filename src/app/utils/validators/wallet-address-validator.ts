export const walletAddressValidator = (control): { [key: string]: any } | null => {
    const walletAddressPattern = /^(0x)?[0-9a-fA-F]{40}$/;
    if (!walletAddressPattern.test(control.value)) {
      return { 'invalidWalletAddress': true };
    }
    return null;
}