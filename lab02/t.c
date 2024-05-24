#include <stdio.h>
#include <stdlib.h>

int main() {
    int N, M, i, j;
    scanf("%d %d", &N, &M);
    int **matrix = (int **)malloc(N * sizeof(int *));
    if (matrix == NULL) {
        return 1;
    }
    for (i = 0; i < N; i++) {
        matrix[i] = (int *)malloc(M * sizeof(int));
        if (matrix[i] == NULL) {
            for (int k = 0; k < i; k++) {
                free(matrix[k]);
            }
            free(matrix);
            return 1;
        }
    }
    for (i = 0; i < N; i++) {
        for (j = 0; j < M; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }

    int **transposed = (int **)malloc(M * sizeof(int *));
    if (transposed == NULL) {
        return 1;
    }
    for (i = 0; i < M; i++) {
        transposed[i] = (int *)malloc(N * sizeof(int));
        if (transposed[i] == NULL) {
            for (int k = 0; k < i; k++) {
                free(transposed[k]);
            }
            free(transposed);
            return 1;
        }
    }

    for (i = 0; i < N; i++) {
        for (j = 0; j < M; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }

    for (i = 0; i < M; i++) {
        for (j = 0; j < N; j++) {
            printf("%d ", transposed[i][j]);
        }
        printf("\n");
    }

    for (i = 0; i < N; i++) {
        free(matrix[i]);
    }
    free(matrix);

    for (i = 0; i < M; i++) {
        free(transposed[i]);
    }
    free(transposed);

    return 0;
}
