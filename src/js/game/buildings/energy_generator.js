import { enumDirection, Vector } from "../../core/vector";
import { ItemAcceptorComponent, enumItemAcceptorItemFilter } from "../components/item_acceptor";
import { Entity } from "../entity";
import { MetaBuilding } from "../meta_building";
import { GameRoot } from "../root";
import { enumHubGoalRewards } from "../tutorial_goals";
import { EnergyGeneratorComponent } from "../components/energy_generator";
import { WiredPinsComponent, enumPinSlotType } from "../components/wired_pins";

export class MetaEnergyGenerator extends MetaBuilding {
    constructor() {
        super("energy_generator");
    }

    isRotateable(variant) {
        return false;
    }

    getSilhouetteColor() {
        return "#c425d7";
    }

    /**
     * @param {GameRoot} root
     * @param {string} variant
     * @returns {Array<[string, string]>}
     */
    getAdditionalStatistics(root, variant) {
        // TODO
        return [];
    }

    getDimensions(variant) {
        return new Vector(2, 2);
    }

    /**
     * @param {GameRoot} root
     */
    getIsUnlocked(root) {
        return root.hubGoals.isRewardUnlocked(enumHubGoalRewards.reward_cutter_and_trash);
    }

    /**
     * Creates the entity at the given location
     * @param {Entity} entity
     */
    setupEntityComponents(entity) {
        entity.addComponent(
            new ItemAcceptorComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        directions: [enumDirection.top],
                        filter: enumItemAcceptorItemFilter.shape,
                    },

                    {
                        pos: new Vector(1, 0),
                        directions: [enumDirection.top],
                        filter: enumItemAcceptorItemFilter.shape,
                    },
                    {
                        pos: new Vector(0, 1),
                        directions: [enumDirection.bottom],
                        filter: enumItemAcceptorItemFilter.shape,
                    },
                    {
                        pos: new Vector(1, 1),
                        directions: [enumDirection.bottom],
                        filter: enumItemAcceptorItemFilter.shape,
                    },
                ],
            })
        );

        entity.addComponent(
            new EnergyGeneratorComponent({
                // Set by the energy generator system later
                requiredKey: null,
            })
        );

        entity.addComponent(
            new WiredPinsComponent({
                slots: [
                    {
                        pos: new Vector(0, 0),
                        type: enumPinSlotType.energyEjector,
                    },
                    {
                        pos: new Vector(1, 0),
                        type: enumPinSlotType.energyEjector,
                    },
                    {
                        pos: new Vector(0, 1),
                        type: enumPinSlotType.energyEjector,
                    },
                    {
                        pos: new Vector(1, 1),
                        type: enumPinSlotType.energyEjector,
                    },
                ],
            })
        );
    }
}
