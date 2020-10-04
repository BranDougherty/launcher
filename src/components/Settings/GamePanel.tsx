import React from "react";
import { observer } from "mobx-react";
import { toast } from "react-toastify";

import Checkbox from "../Common/Checkbox";
import Panel from "../Common/Panel";
import Spinner from "../Common/Spinner";

import GameSettingsStore from "src/stores/settings/client/game";

import "./SettingsPanel.css";

type GamePanelProps = {
    gameSettingsStore: GameSettingsStore;
}

const GamePanel: React.FC<GamePanelProps> = props => {
    const gameSettings = props.gameSettingsStore.settings;

    if (!props.gameSettingsStore.isLoading && !gameSettings) {
        props.gameSettingsStore.loadSettings();
    }

    const handleScreenShakeToggle = (checked: boolean): void => {
        gameSettings.screenShake = checked;
    }

    const handleScreenshotToggle = (checked: boolean): void => {
        gameSettings.screenshotAfterRound = checked;
    }

    const handleServerModsToggle = (checked: boolean): void => {
        gameSettings.allowServerMods = checked;
    }

    const handleRestoreDefaults = (): void => {
        props.gameSettingsStore.restoreDefaultSettings();
    }

    const handleSaveClick = (): void => {
        props.gameSettingsStore.saveSettings()
        .then(function () {
            toast.success("Game settings saved", { autoClose: 2500 });
        })
        .catch(function (errorMessage: string) {
            toast.error("Could not save game settings:\n" + errorMessage);
        });
    }

    const isLoading = props.gameSettingsStore.isLoading || !gameSettings;
    return (
        <div className="settings-panel-container">
            <Panel>
            {isLoading
            ?   <div className="centered-spinner">
                    <Spinner />
                </div>
            :   <div className="form">
                    <div className="field">
                        <label
                            className="label"
                            htmlFor="screen-shake">
                            Screen shake from enemy fire
                        </label>
                        <div className="user-input">
                            <Checkbox
                                id="screen-shake"
                                colorTheme="dark"
                                checked={gameSettings.screenShake}
                                onToggle={handleScreenShakeToggle} />
                        </div>
                    </div>

                    <div className="field">
                        <label
                            className="label"
                            htmlFor="screenshot-after-round">
                            Take screenshot when game ends
                        </label>
                        <div className="user-input">
                            <Checkbox
                                id="screenshot-after-round"
                                colorTheme="dark"
                                checked={gameSettings.screenshotAfterRound}
                                onToggle={handleScreenshotToggle} />
                        </div>
                    </div>

                    <div className="field">
                        <label
                            className="label"
                            htmlFor="server-mods">
                            Allow server mods
                        </label>
                        <div className="user-input">
                            <Checkbox
                                id="server-mods"
                                colorTheme="dark"
                                checked={gameSettings.allowServerMods}
                                onToggle={handleServerModsToggle} />
                        </div>
                    </div>
                </div>
            }
            </Panel>

            {!isLoading &&
            <div className="action-buttons">
                <button
                    className="button grey-button"
                    onClick={handleRestoreDefaults}>
                    Restore defaults
                </button>

                <button
                    onClick={handleSaveClick}
                    disabled={props.gameSettingsStore.isSaving}
                    className="button green-button save-button">
                    Save game
                </button> 
            </div>
            }
        </div>
    )
}

export default observer(GamePanel);