//!native
//!optimize 2
import { OnoeNum } from "@rbxts/serikanum";
import { Workspace } from "@rbxts/services";
import CurrencyBundle from "shared/currency/CurrencyBundle";
import Packets from "shared/Packets";

let lastRecalculation = 0;
let isFormatting = false;
const SCIENTIFIC_FALLBACK_THRESHOLD = new OnoeNum(1.79e308);
const recalculate = () => {
    const camera = Workspace.CurrentCamera;
    isFormatting = camera !== undefined && camera.ViewportSize.X < 1000 && Packets.settings.get()?.FormatCurrencies;
    return isFormatting;
};
isFormatting = recalculate();

/**
 * Displays the balance of a currency in the appropriate format.
 * @param currency The currency to display.
 * @param amount The amount of currency to display.
 * @returns The formatted currency string
 */
export default function displayBalanceCurrency(currency: Currency, amount: OnoeNum | number): string {
    if (tick() - lastRecalculation > 5) {
        lastRecalculation = tick();
        isFormatting = recalculate();
    }

    if (isFormatting) {
        const onoeAmount = new OnoeNum(amount);
        if (onoeAmount.moreThan(SCIENTIFIC_FALLBACK_THRESHOLD)) {
            return onoeAmount.toScientific();
        }
        return tostring(onoeAmount);
    }

    return CurrencyBundle.getFormatted(currency, amount, true);
}
