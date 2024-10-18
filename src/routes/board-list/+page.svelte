<script>
    export let data;
    const boards = data.boards || [];
    console.log("data: ", data);
</script>

<main>
    <h1 class="header">Board List</h1>
    <ul>
        {#each data.boards as board}
            <li>
                <a href="/board?boardid={board._id}">{board.name}</a>
            </li>
        {/each}
    </ul>
</main>
