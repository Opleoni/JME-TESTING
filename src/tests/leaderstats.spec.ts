import { beforeEach, describe, expect, it } from "@rbxts/jest-globals";
import Leaderstats from "shared/data/Leaderstats";

describe("Leaderstats", () => {
    let player: Player;

    beforeEach(() => {
        player = new Instance("Folder") as unknown as Player;
    });

    it("multiplies numeric leaderstats individually and in bulk", () => {
        Leaderstats.setLeaderstat(player, "Donated", 4);
        Leaderstats.setLeaderstat(player, "XP", 2.5);
        Leaderstats.setLeaderstat(player, "Area", "BarrenIslands");

        const changed = Leaderstats.multiplyLeaderstats(player, "all", 3);

        expect(changed).toBe(2);
        expect(Leaderstats.getLeaderstat(player, "Donated")).toBe(12);
        expect(Leaderstats.getLeaderstat(player, "XP")).toBe(7.5);
        expect(Leaderstats.getLeaderstat(player, "Area")).toBe("BarrenIslands");
    });

    it("multiplies a single numeric leaderstat", () => {
        Leaderstats.setLeaderstat(player, "Donated", 10);
        Leaderstats.setLeaderstat(player, "Area", "BarrenIslands");

        const changed = Leaderstats.multiplyLeaderstats(player, "Donated", 0);

        expect(changed).toBe(1);
        expect(Leaderstats.getLeaderstat(player, "Donated")).toBe(0);
        expect(Leaderstats.getLeaderstat(player, "Area")).toBe("BarrenIslands");
    });
});
