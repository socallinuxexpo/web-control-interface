#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <sys/io.h>

#define BASE 0x378

int main(int argc, char** argv) {
    //Check that port file was given
    if (argc != 1) {
        printf("Bad Arguments\n");
        exit(-1);
    }
    //Permissions to use port
    if (ioperm(BASE,3,1) != 0)
    {
        printf("Failed to open parallel port.\n");
        exit(-1);
    }
    //Port "ON"
    outb(0xFF,BASE);
    usleep(250000);
    outb(0x00,BASE);
    printf("Successfully toggled parallel port.\n");
    exit(0);
}
