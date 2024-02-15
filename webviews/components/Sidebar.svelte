<script lang="ts">
  let todos: Array<{ text: string; completed: boolean }> = [];
  let text = "";
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
