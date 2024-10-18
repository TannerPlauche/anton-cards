<script lang="ts">
    // import { afterUpdate, onMount } from "svelte";
    // import IconService from "../lib/services/icon.service";
    import { goto } from "$app/navigation";
    import Button, { Label } from "@smui/button";
    import Dialog, { Title, Content, Actions } from "@smui/dialog";
    import Textfield from "@smui/textfield";
    import HelperText from "@smui/textfield/helper-text";
    import axios from "axios";
    // import { createSpeechBoard } from "$lib/services/speech-board.service";
    // import { createBoard } from "./+page.server";

    let open = false;
    let newBoardName = "";

    const toggleDialog = () => (open = !open);

    async function createNewBoard() {
        const response = await axios.post("/", { name: newBoardName });
        const newBoard = response.data;
        console.log("newBoard: ", newBoard);
        console.log(newBoard._id);
        toggleDialog();
        goto(`/board?boardid=${newBoard._id}`);
    }

    function goToBoardList() {
        goto("/board-list");
    }
</script>

<main class="header">
    <div>Speech Boards</div>
    <Button variant="raised" on:click={goToBoardList}>See Boards</Button>
    <Button variant="raised" on:click={toggleDialog}>Create Board</Button>
    <Dialog
        bind:open
        aria-labelledby="large-scroll-title"
        aria-describedby="large-scroll-content"
        surface$style="width: 850px; max-width: calc(100vw - 32px);"
    >
        <Title>Create Board</Title>
        <Content>
            <!-- <Textfield label="Board Name" />
            <HelperText>Enter a name for your board</HelperText> -->
            <Textfield
                class="search-input"
                bind:value={newBoardName}
                label="New Board Name"
            >
                <HelperText slot="helper">New Board Name</HelperText>
            </Textfield>
        </Content>
        <Actions>
            <Button variant="raised" on:click={toggleDialog}>Cancel</Button>
            <Button variant="raised" on:click={createNewBoard}>Create</Button>
        </Actions>
    </Dialog>
</main>

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
