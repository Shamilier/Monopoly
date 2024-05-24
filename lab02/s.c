#include <stdio.h>
#include <stdlib.h>

int main() {
    int N, i, temp;
    scanf("%d", &N);
    int *arr = (int *)malloc(N * sizeof(int));
    if (arr == NULL) {
        printf("Ошибка памяти\n");
    }
    for (i = 0; i < N; i++) {
        scanf("%d", &arr[i]);
    }

    for (i = 0; i < N / 2; i++) {
        temp = arr[i];
        arr[i] = arr[N - 1 - i];
        arr[N - 1 - i] = temp;
    }

    for (i = 0; i < N; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    free(arr);
    return 0;
}
