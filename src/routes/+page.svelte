<script>
    import { afterUpdate, onMount } from "svelte";
    // import { wordGroups } from "../constants.js";

    export let data;
    console.log("data: ", data);
    /**
     * @type {SpeechSynthesisVoice[]}
     */
    let voices = [];
    /**
     * @type {SpeechSynthesisVoice}
     */
    let voice;
    function getVoices() {
        return new Promise((resolve, reject) => {
            let id;

            id = setInterval(() => {
                if (window.speechSynthesis.getVoices().length !== 0) {
                    resolve(window.speechSynthesis.getVoices());
                    clearInterval(id);
                }
            }, 10);
        });
    }

    onMount(async () => {
        voices = await getVoices();
        // console.log("voiceResults: ", voices);
        // voices = voiceResults;
        // console.log("voices: ", voices);
        voice = voices.find((voice) => voice.name === "Aaron");
        const body = document.getElementsByTagName("body")[0];
        body.style.backgroundColor = "#f7faf8";
    });

    /**
     * @param {string} text
     */
    function speak(text) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.voice = voice;
        window.speechSynthesis.speak(msg);
    }
</script>

<h2 class="header">Talk Board</h2>
<div class="voice-selector">
    <select name="voices" id="voiceSelector" bind:value={voice}>
        {#each voices as voice}
            <option value={voice}>{voice.name}</option>
        {/each}
    </select>
</div>
<div class="board">
    {#each data.wordGroups as wordGroup}
        <div class="word-group">
            <h4 class="group-name">{wordGroup.groupName}</h4>
            <div class="word-list">
                {#each wordGroup.words as word}
                    <div class="card" on:click={() => speak(word.word)}>
                        <p class="word">{word.word}</p>
                        <img class="card-image" src="/{word.fileName}" alt="" />
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>

<style lang="postcss">
    :global(body) {
        @apply bg-zinc-900;
    }

    .header {
        text-align: center;
    }
    .voice-selector {
        display: flex;
        justify-content: center;
        padding: 1rem;
    }

    .board {
        display: flex;
        flex-direction: column;
    }

    .word-group {
        display: flex;
        flex-direction: column;
    }

    .group-name {
        text-align: center;
        font-weight: bold;
        /* margin: 1rem; */
    }

    .word-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .card {
        min-width: 15%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 1rem;
        padding: 0.5rem;
        border: 1px solid lightskyblue;
        border-radius: 1rem;
    }

    .word {
        font-size: 1.5rem;
        margin: 1rem;
    }
    .card-image {
        max-width: 100px;
    }
</style>
