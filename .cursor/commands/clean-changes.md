The intent of this command is to clean any changes made to the directory and hard reset it to main:

1. Fetch the latest changes from the remote repository.

    This command updates the remote-tracking branches (like origin/main) without modifying your local working files.

    ```bash
    git fetch origin
    ```

2. Ensure you are on the main branch.

    ```bash
    git checkout main
    ```

    If you're using a newer version of Git (2.23+), you can use `git switch main`.

3. Perform a hard reset.

    This command moves your current branch pointer to match the remote branch's state, overwriting all modified files in your working directory and staging area.

    ```bash
    git reset --hard origin/main
    ```

4. Remove any untracked files and directories.

    The `git reset` command does not remove files that were never tracked by Git. Use `git clean` to remove them.

    **Dry run (recommended first):** See which files will be removed before actually deleting them.

    ```bash
    git clean -fdn
    ```

    **Force clean:** If you are sure, run this command to forcefully remove untracked files (`-f` for force) and directories (`-d`).

    ```bash
    git clean -fdf
    ```

5. Verify the state of your repository.

    Your local main branch should now be an exact copy of the remote origin/main branch, with no pending changes or untracked files.

    ```bash
    git status
    ```
