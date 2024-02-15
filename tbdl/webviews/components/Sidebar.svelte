<script lang="ts">
  import { onMount } from "svelte";

  let todos: Array<{ text: string; completed: boolean }> = [];
  let text = "";

  onMount(() => {
    window.addEventListener("message", (event) => {
      const message = event.data; // The json data that the extension sent
      console.log({ message });
      switch (message.type) {
        case "add-task":
          todos = [{ text: message.value, completed: false }, ...todos];
          break;
      }
    });
  });
</script>

<!-- <div>Hello</div> -->

<form
  on:submit|preventDefault={() => {
    todos = [{ text, completed: false }, ...todos];
    text = "";
  }}
>
  <input bind:value={text} />
</form>

<ul>
  {#each todos as todo (todo.text)}
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    {#if todo.completed}
      <li
        style="text-decoration: line-through;"
        on:click={() => {
          todo.completed = !todo.completed;
        }}
      >
        {todo.text}
      </li>
    {:else}
      <li
        on:click={() => {
          todo.completed = !todo.completed;
        }}
      >
        {todo.text}
      </li>
    {/if}
  {/each}
</ul>

<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onInfo",
      value: "info message",
    });
  }}>click me for Info</button
>

<button
  on:click={() => {
    tsvscode.postMessage({
      type: "onError",
      value: "error message",
    });
  }}>click me for Error</button
>

<!-- {#if todos.length > 0}
  <pre>
    {JSON.stringify(todos, null, 2)}
  </pre>
{/if} -->

<!-- <style>
  .complete {
    text-decoration: line-through;
  }
</style> -->
