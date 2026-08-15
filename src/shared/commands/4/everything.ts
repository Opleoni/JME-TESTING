import { CURRENCY_DETAILS } from "shared/currency/CurrencyDetails";
import { Server } from "shared/api/APIExpose";
import Command from "shared/commands/Command";

export = new Command(script.Name)
    .setDescription(
        "<currency|all> <multiplier> : Multiplies future currency gain. Use all to target every currency. 50 = x50, 1 = normal, 0 = none. Use underscores for spaces.",
    )
    .setExecute((sender, statName, multiplierText) => {
        const multiplier = tonumber(multiplierText);
        if (multiplier === undefined) {
            if (sender !== undefined) {
                Server.ChatHook.sendPrivateMessage(
                    sender,
                    "Usage: /everything <currency|all> <multiplier>",
                    "color:255,43,43",
                );
            }
            return;
        }

        statName = (statName ?? "all").gsub("_", " ")[0];
        const isAll = statName.lower() === "all";

        if (isAll) {
            Server.Currency.setAllGainMultipliers(multiplier);
            const message = `Applied x${multiplier} to all currency gains.`;
            if (sender !== undefined) {
                Server.ChatHook.sendPrivateMessage(sender, message, "color:138,255,138");
            } else {
                print(message);
            }
            return;
        }

        if (CURRENCY_DETAILS[statName as Currency] === undefined) {
            if (sender !== undefined) {
                Server.ChatHook.sendPrivateMessage(sender, `Unknown currency: ${statName}.`, "color:255,43,43");
            }
            return;
        }

        Server.Currency.setGainMultiplier(statName as Currency, multiplier);
        const message = `Applied x${multiplier} to ${statName} gain.`;
        if (sender !== undefined) {
            Server.ChatHook.sendPrivateMessage(sender, message, "color:138,255,138");
        } else {
            print(message);
        }
    })
    .setPermissionLevel(4);
