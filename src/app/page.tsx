import { Flex, Text, Button } from "@radix-ui/themes";

export default function HomePage() {
  return (
      <Flex direction="column" gap="3" p="4">
        <Text size="5" weight="bold">
          Welcome to Radix UI with Next.js
        </Text>
        <Button variant="classic">Click me</Button>
      </Flex>
  );
}
