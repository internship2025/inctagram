import { Flex, Text } from "@radix-ui/themes";
import { Button } from "@/common/ui/button/button";

export default function HomePage() {
  return (
    <Flex direction="column" gap="3" p="4">
      <Text size="5" weight="bold">
        Welcome to Radix UI with Next.js
      </Text>
      <Button variant={"primary"}>Click me4</Button>
      <Button variant={"secondary"}>Click me3</Button>
      <Button variant={"outline"}>Click me1</Button>
      <Button variant={"ghost"}>Click me2</Button>
    </Flex>
  );
}
