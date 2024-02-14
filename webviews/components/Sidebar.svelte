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
    <li
      class={todo.completed ? "complete" : ""}
      on:click={() => {
        todo.completed = !todo.completed;
        console.log(todo.completed);
      }}
    >
      {todo.text}
    </li>
  {/each}
</ul>

<!-- {#if todos.length > 0}
  <pre>
    {JSON.stringify(todos, null, 2)}
  </pre>
{/if} -->

<style>
  .complete {
    text-decoration: line-through;
  }
</style>
