<script lang="ts">
    import { afterUpdate, onMount } from "svelte";
    import IconService from "../../lib/services/icon.service.js";
    import Button, { Label } from "@smui/button";
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Textfield from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";

    export let data;
    // console.log("data: ", data);
    /**
     * @type {SpeechSynthesisVoice[]}
     */
    let voices: any = [];
    /**
     * @type {SpeechSynthesisVoice}
     */
    let voice: any;

    let query = "";
    let newWord = "";
    let icons: any[] = [];
    let open = false;

    const toggleDialog = () => (open = !open);

    function getVoices() {
        return new Promise((resolve, reject) => {
            let id: any;

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
        voice = voices.find((voice: any) => voice.name === "Aaron");
        const body = document.getElementsByTagName("body")[0];
        body.style.backgroundColor = "#f7faf8";
    });

    /**
     * @param {string} text
     */
    function speak(text: string) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        msg.voice = voice;
        window.speechSynthesis.speak(msg);
    }

    async function search() {
        const results = await IconService.search(query);
        icons = results.icons;
    }

    function getPreviewUrl(icon: any) {
        const px128Previews = icon.raster_sizes.find(
            (rasterSize: any) => (rasterSize.size = 128),
        );
        console.log("px128Previews: ", px128Previews);
        let url = px128Previews.formats[0].preview_url;
        url = url.replace("-16", "-128");
        console.log("url: ", url);
        return url;
    }
</script>

<h1 class="header">{data.name}</h1>
<a href="/">home</a>
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

<Button variant="raised" on:click={toggleDialog}>Add Word</Button>

<!-- DIALOG -->

<Dialog
    bind:open
    aria-labelledby="large-scroll-title"
    aria-describedby="large-scroll-content"
    surface$style="width: 850px; max-width: calc(100vw - 32px);"
>
    <Title id="large-scroll-title">A Brief Selection of Placeholder Text</Title>
    <Content id="large-scroll-content">
        <div>
            <h1 class="header">search</h1>
            <div class="icon-search">
                <div class="search-inputs">
                    <Textfield
                        class="search-input"
                        bind:value={newWord}
                        label="Word"
                    >
                        <HelperText slot="helper"></HelperText>
                    </Textfield>
                    <Textfield
                        class="search-input"
                        bind:value={query}
                        label="Icon Search"
                    >
                        <HelperText slot="helper"></HelperText>
                    </Textfield>
                    <Button variant="raised" on:click={search}>Search</Button>
                </div>
                <div class="word-list">
                    {#each icons as icon}
                        <div>
                            <img
                                class="preview"
                                src={getPreviewUrl(icon)}
                                alt=""
                            />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </Content>
    <Actions>
        <Button action="accept">
            <Label>Done</Label>
        </Button>
    </Actions>
</Dialog>

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
        width: 100px;
    }
    @media only screen and (max-width: 600px) {
        .card-image {
            width: 50px;
        }
    }

    .preview {
        width: 100px;
        margin: 0.5rem;
    }

    .icon-search {
        display: flex;
        flex-direction: column;
    }

    .search-inputs {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid lightcoral;
    }

    .search-input {
        margin: 0.5 rem;
    }
</style>
